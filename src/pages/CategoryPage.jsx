import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="p-4 mt-13">
      <h1 className="text-xl font-semibold">
        Showing products for: <span className="text-blue-600">{categoryName}</span>
      </h1>
    </div>
  );
};

export default CategoryPage;
