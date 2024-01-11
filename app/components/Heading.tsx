'use client';
import "./StyleCss/style.css";
interface HeadingProps {
  title: string;
  subtitle?: string | null;
  center?: boolean;
  department?:string | null;
}

const Heading: React.FC<HeadingProps> = ({ 
  title, 
  subtitle,
  center,
  department,
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold">
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2">
      <span className="text-black font-bold">{subtitle}</span>
      </div>
    </div>
   );
}
 
export default Heading;