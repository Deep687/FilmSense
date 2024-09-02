const VideoBg = (trailer) => {
  return (
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBg;
