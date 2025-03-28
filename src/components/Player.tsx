interface PlayerProps {
  urlPlayer: string | undefined;
}
const Player: React.FC<PlayerProps> = ({ urlPlayer }) => {
  return (
    <div className="flex justify-around flex-col lg:flex-row gap-5 mt-20 mb-20">
      <iframe
        className=" rounded-2xl w-full h-[25vh] lg:h-[60vh] lg:w-[100vh]"
        src={urlPlayer}
        // width="910px"
        // height="570px"
        allowFullScreen
      ></iframe>
      <iframe
        className="rounded-2xl h-[60vh] lg:h-[60vh] lg:w-[w-20vh]"
        src="https://www.crazygames.com/embed/blockbuster-puzzle"
        allow="gamepad *;"
      ></iframe>
    </div>
  );
};

export default Player;
