import React, { useState, useEffect } from 'react';

const AboutUs = () => {
  const [aboutData, setAboutData] = useState({ text: '', imageUrl: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the server
    fetch('/about') // Make sure this matches your Express route
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
        setAboutData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // return (
  //   <div className="about-us">
  //     <h1>About Us</h1>
  //     {/* Hi grader, I really wanted to know why fetching data from aboutData is not working. 
  //     <p>{aboutData.intro}</p> */}
  //     <p>Hi, my name is Ashley Liu, a junior majoring in Computer Science at NYU. I am originally from Beijing, China, and I love doing all kinds of sports and travelling with my friends.</p>

  //     {/* <img src={aboutData.imageUrl} alt="Ashley Liu" /> */}
  //     {/* <img src={`${process.env.PUBLIC_URL}/my-photo.png`} alt="Ashley Liu" /> */}
  //     <img 
  //       src={`${process.env.PUBLIC_URL}/my-photo.png`} 
  //       alt="Ashley Liu" 
  //       style={{ width: '300px', height: 'auto' }}
  //     />
  //   </div>
  // );

  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Hi, my name is Ashley Liu, a junior majoring in Computer Science at NYU.<br />
        I am originally from Beijing, China, and I love doing all kinds of sports<br />
        and travelling with my friends.
      </p>
      <img 
        src={`${process.env.PUBLIC_URL}/my-photo.png`} 
        alt="Ashley Liu" 
        style={{ width: '300px', height: 'auto' }}
      />
    </div>
  );
};

export default AboutUs;
