const FoodInfoCard = ({ foodItem }: any) => {
  const food = foodItem.food;

  if (!food) {
    return <div className="text-gray-400">Food item is unavailable</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <div>
        <img
          src={food.image || "N/A"}
          alt={food.foodName}
          width={32}
          height={31}
        />
      </div>
      <div className="font-medium">{food.foodName}</div>
      <div className="text-gray-500">x{foodItem.quantity}</div>
    </div>
  );
};

export default FoodInfoCard;
