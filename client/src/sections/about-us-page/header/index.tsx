const Header: React.FC = () => {
  return (
    <section className="text-center py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-5xl font-bold text-text mb-4">
          Welcome to <span className="text-primary">Bit</span>
          <span className="text-secondary">Raise</span>
        </h1>
        <p className="text-base sm:text-lg text-white">
          Empowering the future of finance by connecting innovative projects
          with forward-thinking investors through our decentralized crowdfunding
          platform.
        </p>
      </div>
    </section>
  );
};
export { Header };
