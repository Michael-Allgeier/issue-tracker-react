function NotFound() {
  return (
    <div className="NotFound p-3 bg-dark rounded">
      <h1 className="NotFound-Header text-center text-danger">Page Not Found</h1>
      <div className="text-center">Sorry! We can't find the page you're looking for because it doesn't exist!</div>
    </div>
  );
}

export default NotFound;