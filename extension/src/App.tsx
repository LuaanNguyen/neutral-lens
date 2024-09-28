function App() {
  return (
    <div className="main">
      <header className="header">
        <h1 className="title">Hello</h1>
      </header>
      <div className="content">
        {/* Add your main content here */}
        <p>Welcome to my Chrome extension!</p>
        <input type="text" className="input" placeholder="Enter text" />
        <button className="button">Click me</button>
      </div>
      <footer className="footer">
        <p>© 2024 My Extension</p>
      </footer>
    </div>
  );
}

export default App;
