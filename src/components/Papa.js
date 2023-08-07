import Papa from "papaparse";

function csvconvert() {
  return (
    <div className="App">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const files = e.target.files;
          console.log(files);
          if (files) {
            console.log(files[0]);
            Papa.parse(files[0], {
              complete: function(results) {
                console.log("Finished:", results);
              }}
            )
          }
        }}
      />
    </div>
  );
}
export default csvconvert;