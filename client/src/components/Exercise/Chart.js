import React from "react";
import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";

class Chart extends React.Component {
  componentDidMount() {
    this.creatLineChart();
  }

  componentDidUpdate() {
    this.creatLineChart();
  }

  reformatData = (listLogs) => {
    const formattedData = listLogs.map((log) => {
      return { ...log, date: d3.timeParse("%Y-%m-%dT00:00:00")(log.date) };
    });
    //sort by date
    formattedData.sort((a, b) => (a.date > b.date ? 1 : -1));
    return formattedData;
  };

  // 2 separate charts, one for weight another for sets and reps
  creatLineChart = () => {
    const { property } = this.props;
    const margin = { top: 10, right: 10, bottom: 30, left: 20 };

    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const data = this.reformatData(this.props.exercise.logs);
    const propertyValues = Array.from(
      this.props.exercise.logs,
      (log) => log[property]
    );
    const yMax = Math.max(...propertyValues);
    const svg = d3
      .select(this.node)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Add X axis --> it is a date format
    var x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(d3.timeDay.every(4)));

    // Add Y axis
    var y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (data) {
            return x(data.date);
          })
          .y(function (data) {
            return y(data[property]);
          })
      );

    //add red dots
    svg
      .selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "black")
      .attr("stroke", "none")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", function (d) {
        return y(d[property]);
      })
      .attr("r", 3);
  };

  render() {
    const { property } = this.props;
    return (
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          {property.charAt(0).toUpperCase() + property.slice(1)} Progression
        </Typography>
        <svg ref={(node) => (this.node = node)} width={300} height={300}></svg>
      </div>
    );
  }
}

export default Chart;
