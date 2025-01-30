export function Card({ children }) {
    return <div className="bg-white shadow-lg rounded-lg p-6">{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="bg-blue-500 text-white p-4 rounded-t-lg">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <h2 className="text-xl font-bold">{children}</h2>;
  }
  