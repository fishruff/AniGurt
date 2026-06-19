interface PlayerProps {
  urlPlayer: string | undefined;
}

const Player: React.FC<PlayerProps> = ({ urlPlayer }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-5 mt-5">
      {urlPlayer ? (
        <iframe
          className="w-full h-[30vh] lg:h-[80vh] lg:w-3/4 rounded-2xl"
          src={urlPlayer}
          allowFullScreen
        ></iframe>
      ) : (
        <div className="w-full h-[30vh] lg:h-[80vh] lg:w-3/4 rounded-2xl bg-gray-900 flex items-center justify-center text-gray-400 text-center p-4">
          Плеер недоступен для этого тайтла
        </div>
      )}
      <iframe
        className="w-full h-[60vh] lg:h-[80vh] lg:w-1/4 rounded-2xl"
        src="https://www.crazygames.com/embed/blockbuster-puzzle"
        allow="gamepad *;"
      ></iframe>
    </div>
  );
};

export default Player;
