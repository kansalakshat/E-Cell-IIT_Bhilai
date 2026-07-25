import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Events data
const eventsData = [
  {
    id: 1,
    title: 'Startup Pitch Competition',
    description: 'Present your innovative ideas and compete for funding opportunities',
    category: 'competition',
    date: '2024-08-15',
    time: '14:00',
    location: 'Auditorium',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    speakers: ['Industry Experts', 'Angel Investors'],
    participants: 150
  },
  {
    id: 2,
    title: 'Tech Innovation Talk',
    description: 'Learn from a serial entrepreneur about building scalable products',
    category: 'talk',
    date: '2024-08-20',
    time: '16:00',
    location: 'Conference Hall',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    speakers: ['Founder at TechCorp'],
    participants: 200
  },
  {
    id: 3,
    title: 'Design Thinking Workshop',
    description: 'Master the art of solving real-world problems with design thinking',
    category: 'workshop',
    date: '2024-08-25',
    time: '10:00',
    location: 'Workshop Hub',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    participants: 120
  },
  {
    id: 4,
    title: 'Hackathon 2024',
    description: 'Build innovative solutions in 24 hours and win prizes',
    category: 'hackathon',
    date: '2024-09-10',
    time: '09:00',
    location: 'Campus',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    participants: 300
  },
  {
    id: 5,
    title: 'Investor Meet & Greet',
    description: 'Network with venture capitalists and angel investors',
    category: 'networking',
    date: '2024-09-05',
    time: '18:00',
    location: 'Banquet Hall',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    participants: 250
  },
  {
    id: 6,
    title: 'Marketing Masterclass',
    description: 'Learn growth hacking strategies from industry leaders',
    category: 'workshop',
    date: '2024-09-12',
    time: '15:00',
    location: 'Seminar Room',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    participants: 100
  }
];

// Routes
app.get('/api/events', (req, res) => {
  res.json(eventsData);
});

app.get('/api/events/:id', (req, res) => {
  const event = eventsData.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalEvents: eventsData.length,
    totalParticipants: eventsData.reduce((sum, e) => sum + e.participants, 0),
    members: 500,
    startups: 15
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  // In production, save to database or send email
  console.log('Contact message:', { name, email, message });
  res.json({ message: 'Message received successfully' });
});

app.listen(PORT, () => {
  console.log(`✨ E-Cell Server running on http://localhost:${PORT}`);
});
