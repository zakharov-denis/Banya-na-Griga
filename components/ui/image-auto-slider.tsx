import React from 'react';

interface ImageAutoSliderProps {
  images?: string[];
  speed?: number;
  imageSize?: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export const ImageAutoSlider: React.FC<ImageAutoSliderProps> = ({ 
  images: customImages,
  speed = 30,
  imageSize = {
    mobile: 'w-48 h-48',
    tablet: 'md:w-64 md:h-64',
    desktop: 'lg:w-80 lg:h-80'
  }
}) => {
  // Default sauna/wellness images
  const defaultImages = [
    "https://images.unsplash.com/photo-1755610146287-2dcdbec596b6?w=800&q=80",
    "https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?w=800&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    "https://images.unsplash.com/photo-1757940113920-69e3686438d3?w=800&q=80",
    "https://images.unsplash.com/photo-1596178060810-4dd23d3d6e6f?w=800&q=80",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    "https://images.unsplash.com/photo-1610631066894-4b807d2fbe61?w=800&q=80",
  ];

  const images = customImages || defaultImages;
  
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right ${speed}s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      
      <div className="w-full relative overflow-hidden flex items-center justify-center">        
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-8">
          <div className="scroll-container w-full">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className={`image-item flex-shrink-0 ${imageSize.mobile} ${imageSize.tablet} ${imageSize.desktop} rounded-xl overflow-hidden shadow-2xl bg-[#3D3226]/20`}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover"
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 2 ? "high" : "low"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
