import { useParams } from 'react-router-dom';
import FeaturedProductsinC from '../components/FeaturedProductsinC';

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="mt-15">
      <img
        src="http://placehold.co/1360x300"
        alt={categoryName}
        className="w-full object-contain object-center"
      />
      <FeaturedProductsinC categoryName={categoryName} />
    </div>
  );
};

export default CategoryPage;
