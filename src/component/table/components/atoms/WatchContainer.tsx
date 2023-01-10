
interface Props {

}

const WatchContainer = ({ image, alt, title, paragraph, titleStyles }: any) => {
  
  
  return (
    <>
      <div className="grid grid-cols-2 border-4 p-3 border-slate-400">
        <div className="flex gap-x-3">
          <img src={image} alt={alt} className="img-icon" />
          <p className={titleStyles}> {title}</p>
        </div>
        <div className="0">
          <p> {paragraph}</p>
        </div>
      </div>
    </>
  );
};

export default WatchContainer;
