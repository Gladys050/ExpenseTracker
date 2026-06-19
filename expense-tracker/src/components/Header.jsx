function Header({ title, subtitle }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8 px-6 mb-8 shadow-lg">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <h2 className="text-xl opacity-90">{subtitle}</h2>
    </div>
  );
}
export default Header;
