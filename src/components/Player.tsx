interface PlayerProps {
  urlPlayer: string | undefined;
}

const Player: React.FC<PlayerProps> = ({ urlPlayer }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-5">
      <iframe
        className="w-full h-[30vh] lg:h-[80vh] lg:w-3/4 rounded-2xl"
        src={urlPlayer}
        allowFullScreen
      ></iframe>
      <iframe
        className="w-full h-[60vh] lg:h-[80vh] lg:w-1/4 rounded-2xl"
        src="https://www.crazygames.com/embed/blockbuster-puzzle"
        allow="gamepad *;"
      ></iframe>
    </div>
  );
};

export default Player;
