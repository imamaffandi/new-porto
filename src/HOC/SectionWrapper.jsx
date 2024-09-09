const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <>
        <span className="bg-transparent" id={idName}></span>
        <Component />
      </>
    );
  };
export default SectionWrapper;
