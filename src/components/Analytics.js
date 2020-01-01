import React from 'react';
import Chart from "chart.js";


class Analytics extends React.Component {

    chartRef = React.createRef();

    componentDidUpdate() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: this.props.daysArrayIndex,
                datasets: [{
                        label: "Search Time (Days)",
                        yAxisID: "Search Time (Days)",
                        data: this.props.daysArray,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)'
                      },{
                      label: 'Number of Interviews',
                      yAxisID: 'Number of Interviews',
                      data: this.props.interviewsArray,
                      type: 'line',
                      backgroundColor: 'rgba(240, 168, 187, 0.8)'
                    }]
            },
            options: {
              legend:{display:true},
              scales: {
                yAxes: [{
                  id: "Search Time (Days)",
                  scaleLabel: {display: true, labelString: 'Search Time (Days)'},
                  ticks: {beginAtZero: true, maxTicksLimit:5},
                  position: 'left'
                }, {
                  id: 'Number of Interviews',
                  scaleLabel: {display: true, labelString: 'Number of Interviews'},
                  ticks: {beginAtZero: true, maxTicksLimit:5},
                  position: 'right'
                }],
                xAxes: [{
                  scaleLabel: {display: true, labelString: 'Student'}
                }]
              }
            }
        });
    }
    render() {
        return (
            <div className="chart">
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default Analytics;
