function StatCard({ title, value, color }) {

  return (
    <div className={`p-6 rounded-xl shadow-md text-white ${color}`}>

      <h3 className="text-lg mb-2">
        {title}
      </h3>

      <p className="text-4xl font-bold">
        {value}
      </p>

    </div>
  );
}

export default StatCard;