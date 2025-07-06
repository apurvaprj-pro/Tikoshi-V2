import { useNavigate } from 'react-router-dom';

const CategoryIcons = () => {
  const navigate = useNavigate();

  const categoryIcons = [
    {
      name: "Fashion",
      image: "/assets/images/category_icons/fashion.jpeg",
    },
    {
      name: "Cosmetics",
      image: "/assets/images/category_icons/beauty_health_care.jpeg",
    },
    {
      name: "Soft Toys",
      image: "/assets/images/category_icons/soft_toys.jpeg",
    },
    {
      name: "Electronics",
      image: "/assets/images/category_icons/electronics.jpeg",
    },
    {
      name: "Kitchen Set",
      image: "/assets/images/category_icons/kitchen_set.jpeg",
    },
    {
      name: "Baby Care",
      image: "/assets/images/category_icons/baby_care.jpeg",
    },
    {
      name: "Shoes",
      image: "/assets/images/category_icons/shoes.jpeg",
    },
    {
      name: "Toys",
      image: "/assets/images/category_icons/toys.jpeg",
    },
    {
      name: "Phone Acc",
      image: "/assets/images/category_icons/mobile_accessories.jpeg",
    },
  ];

  const handleClick = (categoryName) => {
    const encodedName = encodeURIComponent(categoryName);
    navigate(`/category/${encodedName}`);
  };

  return (
    <div className="mt-17 flex justify-center items-center gap-18 mb-[9px]">
      {categoryIcons.map((icon, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => handleClick(icon.name)}
        >
          <img src={icon.image} alt="Category Icon" />
          <p className="text-sm text-gray-600 text-center mt-0.5">
            {icon.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryIcons;
