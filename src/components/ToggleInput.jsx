const ToggleInput = () => {
  return (
    <div className="toggle-input-container">
      <div className="input-title">Pension Contribution</div>
      <div className="toggle-input">
        <div className="toggle">
          <div className="toggle-sign white">%</div>
          <div className="toggle-sign">£</div>
          <div className="toggle-slider"></div>
        </div>
        <input type="number" className="text-input"></input>
      </div>
    </div>
  );
};

export { ToggleInput };
