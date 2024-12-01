import '../styles/SafetyGuidelines.css';

// Image paths for each guideline
import preparedImage from '../assets/images/b1.png';
import trafficRulesImage from '../assets/images/b2.png';
import distractionsImage from '../assets/images/b3.png';
import defensiveDrivingImage from '../assets/images/b4.png';
import poorConditionsImage from '../assets/images/b5.png';

const SafetyGuidelines = () => {
  // Guidelines Data with images and list-formatted content
  const guidelines = [
    {
      title: 'Be Prepared',
      content: [
        'Regularly check brakes, tires, lights, and fluid levels.',
        'Adjust mirrors and seat for a clear view and comfortable access to controls.',
        'Plan your trip to avoid getting lost or distracted by navigation.',
        'Make sure you have an emergency kit, including a first aid kit, flashlight, and jumper cables.',
        'Ensure your car has sufficient fuel before long trips to avoid running out on the road.',
        'Keep a spare tire, jack, and lug wrench in your car in case of emergencies.',
      ],
      bgColor: '#34495e', // Dark blue-gray
      imgSrc: preparedImage, // Image for this guideline
    },
    {
      title: 'Follow Traffic Rules',
      content: [
        'Obey speed limits and adjust speed to match weather or road conditions.',
        'Respect traffic signals, yield when required, and adhere to road signs.',
        'Use turn signals to alert other drivers of turns or lane changes.',
        'Stay in your lane and avoid sudden lane changes without signaling.',
        'Stop for school buses when their stop sign is out and lights are flashing.',
        'Never run a red light, even if you think no one else is around.',
      ],
      bgColor: '#2c3e50', // Darker shade of blue-gray
      imgSrc: trafficRulesImage, // Image for this guideline
    },
    {
      title: 'Avoid Distractions',
      content: [
        'Keep your attention on driving and avoid multitasking.',
        'Avoid texting, calling, or using apps while driving.',
        'Minimize in-car distractions such as eating or grooming.',
        "Avoid looking at your phone, especially when you're stopped at a light.",
        'If you need to make a call, pull over to a safe spot first.',
        'Let your passengers know that driving requires your full attention.',
      ],
      bgColor: '#16a085', // Teal
      imgSrc: distractionsImage, // Image for this guideline
    },
    {
      title: 'Practice Defensive Driving',
      content: [
        'Maintain a 3-second gap between you and the vehicle ahead.',
        'Be prepared for sudden stops, erratic drivers, or pedestrians.',
        'Regularly check mirrors and look over your shoulder when changing lanes.',
        'Be cautious at intersections and avoid assuming other drivers will stop for you.',
        'If you see a potential hazard ahead, slow down and increase your following distance.',
        'Always anticipate the actions of other drivers to react in time to avoid accidents.',
      ],
      bgColor: '#8e44ad', // Purple
      imgSrc: defensiveDrivingImage, // Image for this guideline
    },
    {
      title: 'Drive Cautiously in Poor Conditions',
      content: [
        'Reduce speed during rain, fog, snow, or icy conditions.',
        'Turn on headlights in low visibility but avoid using high beams in fog.',
        'Avoid sudden movements like sharp turns or hard braking on slippery roads.',
        'Ensure your tires are properly inflated and have enough tread to grip the road.',
        'Be extra cautious when driving on bridges or overpasses during icy conditions.',
        'If you feel uncomfortable or unsafe, its okay to pull over and wait until conditions improve.',
      ],
      bgColor: '#e74c3c', // Red
      imgSrc: poorConditionsImage, // Image for this guideline
    },
  ];
  return (
    <div className="safety-guidelines">
      <h1>Safety Driving Guidelines</h1>
      <p>Here are some important safety driving guidelines:</p>
      <div className="guidelines-list">
        {guidelines.map((item, index) => (
          <div
            key={index}
            className="guideline-section"
            style={{ backgroundColor: item.bgColor }}
          >
            <img src={item.imgSrc} alt={item.title} className="guideline-img" />
            <h2>{item.title}</h2>
            <ul className='content-list'>
              {item.content.map((text, index) => (
                <li key={index} style={{ backgroundColor: item.bgColor }}>{text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyGuidelines;
