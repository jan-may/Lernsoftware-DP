export const CodeSelect = () => {
  return (
    <>
      <form>
        <div className="form-group-select">
          <label className="form-label">Problemauswahl</label>
          <select className="form-select">
            <option>fibonacci</option>
            <option>CanSum</option>
            <option>GridTraveler</option>
          </select>
        </div>
      </form>
    </>
  );
};