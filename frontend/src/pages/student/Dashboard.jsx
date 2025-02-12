import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Filter, Star, MapIcon } from 'lucide-react';
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import axios from 'axios';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
    const [selectedFilter, setSelectedFilter] = useState('distance');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];
    const filters = [
        { id: 'distance', label: 'Distance' },
        { id: 'rating', label: 'Rating' },
    ];
    const [nearbyCoaching, setNearbyCoaching] = useState([
        {
            _id: '1',
            centerName: 'Elite Coaching Academy',
            description: 'Providing top-notch coaching for JEE & NEET aspirants.',
            subjects: ['Mathematics', 'Physics', 'Chemistry'],
            distance: 2500,
            photos: ['https://3.imimg.com/data3/XR/CY/MY-7907905/commerce-coaching-in-noida-250x250.jpg'],
            location: { coordinates: [77.1025, 28.7041] },
        },
        {
            _id: '2',
            centerName: 'Pioneer Institute',
            description: 'Expert guidance for board exams and competitive tests.',
            subjects: ['Biology', 'Chemistry', 'Physics'],
            distance: 3500,
            photos: ['https://static.toiimg.com/thumb/msid-85887126,imgsize-81404,width-400,height-225,resizemode-72/85887126.jpg'],
            location: { coordinates: [77.2090, 28.6139] },
        },
        {
            _id: '3',
            centerName: 'Bennett Institute',
            description: 'Expert guidance for board exams and competitive tests.',
            subjects: ['Maths', 'Chemistry', 'Physics'],
            distance: 3500,
            photos: ['https://vajiram-prod.s3.ap-south-1.amazonaws.com/Guidelines_for_Registration_and_Regulation_of_Coaching_Center_2024_dbe9378b9b.webp'],
            location: { coordinates: [77.2090, 28.6139] },
        },
        // {
        //     _id: '4',
        //     centerName: 'Elite Coaching Academy',
        //     description: 'Providing top-notch coaching for JEE & NEET aspirants.',
        //     subjects: ['Mathematics', 'Physics', 'Chemistry'],
        //     distance: 2500,
        //     photos: ['https://3.imimg.com/data3/XR/CY/MY-7907905/commerce-coaching-in-noida-250x250.jpg'],
        //     location: { coordinates: [77.1025, 28.7041] },
        // },
        // {
        //     _id: '5',
        //     centerName: 'Pioneer Institute',
        //     description: 'Expert guidance for board exams and competitive tests.',
        //     subjects: ['Biology', 'Chemistry', 'Physics'],
        //     distance: 3500,
        //     photos: ['https://static.toiimg.com/thumb/msid-85887126,imgsize-81404,width-400,height-225,resizemode-72/85887126.jpg'],
        //     location: { coordinates: [77.2090, 28.6139] },
        // },
        // {
        //     _id: '6',
        //     centerName: 'Bennett Institute',
        //     description: 'Expert guidance for board exams and competitive tests.',
        //     subjects: ['Maths', 'Chemistry', 'Physics'],
        //     distance: 3500,
        //     photos: ['https://vajiram-prod.s3.ap-south-1.amazonaws.com/Guidelines_for_Registration_and_Regulation_of_Coaching_Center_2024_dbe9378b9b.webp'],
        //     location: { coordinates: [77.2090, 28.6139] },
        // }
    ]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                    fetchNearbyCoaching(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLoading(false);
                }
            );
        }
    }, []);

    const fetchNearbyCoaching = async (lat, lng) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/coaching/nearby`, {
                params: { lat, lng },
            });
            setNearbyCoaching(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching coaching centers:', error);
            setLoading(false);
        }
    };

    const filteredCoaching = nearbyCoaching.filter((center) => {
        const matchesSearch =
            center.centerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            center.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = selectedSubject === 'all' || center.subjects.includes(selectedSubject);
        return matchesSearch && matchesSubject;
    });
    return (
        <>
        <Navbar/>
     
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with improved gradient and spacing */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        {/* <School className="w-16 h-16 mx-auto mb-6 text-blue-100" /> */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Find Your Perfect 
                            <span className="text-blue-200"> Learning Path</span>
                        </h1>
                        <p className="text-xl text-blue-100 md:text-2xl font-light">
                            Discover top-rated coaching centers near you
                        </p>
                    </motion.div>

                    {/* Enhanced Search Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-2xl shadow-xl p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by coaching name, subject, or location..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 text-black pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        variant="outline"
                                        className="flex items-center text-black  gap-2 px-6 py-4 text-base"
                                    >
                                        <Filter className="h-5 w-5" />
                                        Filters
                                    </Button>
                                    <Button 
                                        className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-base font-medium"
                                    >
                                        Search
                                    </Button>
                                </div>
                            </div>

                            {/* Improved Filter Panel */}
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-6 border-t text-black  border-gray-100 pt-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-base font-medium text-gray-700 mb-3">
                                                Subjects
                                            </label>
                                            <div className="flex flex-wrap gap-3">
                                                {subjects.map((subject) => (
                                                    <Badge
                                                        key={subject}
                                                        variant={selectedSubject === subject ? "default" : "outline"}
                                                        className="cursor-pointer px-4 py-2 text-sm"
                                                        onClick={() => setSelectedSubject(subject)}
                                                    >
                                                        {subject}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-base font-medium text-gray-700 mb-3">
                                                Sort By
                                            </label>
                                            <div className="flex flex-wrap gap-3">
                                                {filters.map((filter) => (
                                                    <Badge
                                                        key={filter.id}
                                                        variant={selectedFilter === filter.id ? "default" : "outline"}
                                                        className="cursor-pointer px-4 py-2 text-sm"
                                                        onClick={() => setSelectedFilter(filter.id)}
                                                    >
                                                        {filter.label}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Enhanced Results Section */}
            <div className="container mx-auto px-4 py-16 max-w-7xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Coaching Centers Near You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {nearbyCoaching.map((center) => (
                        <motion.div
                            key={center._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                                <div className="relative">
                                    <img
                                        src={center.photos[0]}
                                        alt={center.centerName}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <Badge className="bg-white/95 text-blue-600 backdrop-blur-sm px-3 py-1.5">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current inline mr-1" />
                                            4.8
                                        </Badge>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {center.centerName}
                                            </h3>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <MapPin className="h-4 w-4 mr-1.5" />
                                                <span>{(center.distance / 1000).toFixed(1)} km away</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6 line-clamp-2">{center.description}</p>

                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-2">
                                            {center.subjects.map((subject) => (
                                                <Badge 
                                                    key={subject} 
                                                    variant="secondary"
                                                    className="px-3 py-1 bg-blue-200 text-sm"
                                                >
                                                    {subject}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-auto">
                                        <Button
                                            className="flex-1 text-white  bg-blue-600 hover:bg-blue-700 py-5 text-base font-medium"
                                            onClick={() => {/* handle enrollment */}}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="px-5"
                                            onClick={() => window.open(`https://maps.google.com/?q=${center.location.coordinates[1]},${center.location.coordinates[0]}`, '_blank')}
                                        >
                                            <MapIcon className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};
export default Dashboard;