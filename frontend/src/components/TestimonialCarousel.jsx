import PropTypes from 'prop-types'; // Import PropTypes
import { Card } from "../components/ui/Card";
import './test.css';
import { Star, StarHalf } from "lucide-react";

const testimonials = [
    {
      name: "Sara Mehta",
      quote: "I had an amazing experience! The service was quick and efficient, and I felt supported every step of the way.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Ishaan Verma",
      quote: "Exceptional service and friendly staff. They made the entire process smooth and hassle-free. Highly recommend!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Priya Kapoor",
      quote: "The team went above and beyond to ensure I was satisfied. I am thoroughly impressed with their dedication.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      name: "Arjun Reddy",
      quote: "A fantastic experience from beginning to end. They truly understand customer needs and deliver top-notch results.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      name: "Neha Desai",
      quote: "I was blown away by the professionalism and expertise of the team. I would definitely use this service again!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      name: "Vikram Soni",
      quote: "The service was great, and I could tell they genuinely cared about getting the best results for me. I highly recommend them.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
      name: "Simran Kaur",
      quote: "Fast, efficient, and effective. The experience exceeded my expectations in every way. I’m a happy customer!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/7.jpg"
    }
  ];


const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

const TestimonialCarousel = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="w-full mx-auto px-4 py-12 bg-gradient-to-br from-indigo-100 via-white to-purple-100">
    <div className="relative overflow-hidden">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
      What Our Users Say
      </h1>

        <div className="flex gap-6 animate-scroll">
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-96 bg-white/90 backdrop-blur-lg border-2 border-purple-300 rounded-xl overflow-hidden  transition-all duration-300">
              <div className="p-6 space-y-6 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-indigo-100/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {/* Add Avatar Here if you want */}
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-purple-400 ring-offset-2">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {testimonial.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <StarRating rating={testimonial.rating} />
                  <div className="relative">
                    <p className="text-gray-700 text-lg leading-relaxed pl-4 italic">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
