'use client';
import "./StyleCss/style.css";
interface HeadingProps {
  title: string;
  subtitle?:string | null;
  center?: boolean;
  department?:string | null;
}

const HeadingInfo: React.FC<HeadingProps> = ({ 
  title, 
  subtitle,
  center,
  department,
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold titlemessage">
        Bienvenue au {title}
      </div>
      <div className="font-light text-black-500 mt-2">
        Département : <span className="text-black font-bold">{subtitle}</span>
      </div>
    </div>
   );
}
 
export default HeadingInfo;