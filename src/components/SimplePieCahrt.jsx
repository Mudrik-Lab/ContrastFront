import React from "react";
import Plot from "react-plotly.js";
import axios from "axios";

export default function SimplePieCahrt() {
  const [first, setFirst] = React.useState();
  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          url: "https://api.airtable.com/v0/appQHEMJ1PASK4Kfj/second-PieCharts",
          method: "GET",
          headers: { Authorization: `Bearer keyGsJHfx22k81Gdj` },
        });
        setFirst(res.data);
        console.log(first);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  console.log(first);
  const RPTcategories = first?.records
    .filter((record) => {
      return record.fields["THEORY"] === "RPT";
    })
    .map((record) => {
      return record.fields["Category"];
    })
    .reduce((accumulator, value) => {
      accumulator[value] = ++accumulator[value] || 1;
      return accumulator;
    }, {});

  let RPTData = [];
  if (RPTcategories) {
    for (const [key, value] of Object.entries(RPTcategories)) {
      RPTData.push({ name: key, value });
    }
  }

  const GNWcategories = first?.records
    .filter((record) => {
      return record.fields["THEORY"] === "GNW";
    })
    .map((record) => {
      return record.fields["Category"];
    })
    .reduce((accumulator, value) => {
      accumulator[value] = ++accumulator[value] || 1;
      return accumulator;
    }, {});

  let GNWData = [];
  if (GNWcategories) {
    for (const [key, value] of Object.entries(GNWcategories)) {
      GNWData.push({ name: key, value });
    }
  }

  return (
    <div className="mt-60">
      <Plot
        data={[
          {
            values: RPTData.map((category) => category.value),
            labels: RPTData.map((category) => category.name),

            hole: 0.4,
            type: "pie",
            textinfo: "label",
            textposition: "inside",
            domain: { column: 1 },
          },
        ]}
        layout={{
          width: 500,
          height: 500,
          showlegend: false,
          title: `RPT N=${RPTData.reduce((sum, a) => sum + a.value, 0)}`,
          annotations: [
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "RPT",
              x: 0.5,
              y: 0.5,
            },
          ],
        }}
      />
      <Plot
        data={[
          {
            values: GNWData.map((category) => category.value),
            labels: GNWData.map((category) => category.name),

            hole: 0.4,
            type: "pie",
            textinfo: "label",
            textposition: "inside",
            domain: { column: 1 },
          },
        ]}
        layout={{
          width: 500,
          height: 500,
          showlegend: false,
          title: `RPT N=${GNWData.reduce((sum, a) => sum + a.value, 0)}`,
          annotations: [
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "GNW",
              x: 0.5,
              y: 0.5,
            },
          ],
        }}
      />
    </div>
  );
}
