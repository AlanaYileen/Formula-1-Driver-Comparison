function renderBars(d1, d2) {
  
    d3.select("#comparison-bars").html("");

    const metrics = [
      { name: "Seasons", d1: d1.seasons.size, d2: d2.seasons.size },
      { name: "Races", d1: d1.races, d2: d2.races },
      { name: "Wins", d1: d1.wins, d2: d2.wins },
      { name: "Championships", d1: d1.championships, d2: d2.championships }
    ];

    const panelWidth = document.querySelector(".bars-center").clientWidth;
    const chartWidth = 420;
    const leftOffset = (panelWidth - chartWidth) / 2;

    const barGroupHeight = 80;
    const barHeight = 20;
    const barSpacing = 10;

    const maxValue = d3.max(metrics, m => Math.max(m.d1, m.d2));

    const xScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, chartWidth * 0.45]);

    const svg = d3.select("#comparison-bars")
      .append("svg")
      .attr("width", panelWidth)
      .attr("height", metrics.length * barGroupHeight + 40);

    const groups = svg.selectAll("g")
      .data(metrics)
      .enter()
      .append("g")
      .attr("transform", (d, i) =>
        `translate(${leftOffset}, ${i * barGroupHeight + 50})`
      );

    groups.append("text")
      .text(d => d.name)
      .attr("x", chartWidth / 2)
      .attr("y", -12)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "18px")
      .style("font-weight", "700");

    // ---- DRIVER 1 (BLUE) ----
    groups.append("rect")
      .attr("x", 0)
      .attr("height", barHeight)
      .attr("width", d => xScale(d.d1))
      .attr("fill", "#0C7BDC");

  
    groups.append("text")
      .text(d => d.d1)
      .attr("x", d => xScale(d.d1) + 6)
      .attr("y", barHeight / 2 + 5)
      .attr("fill", "white")
      .style("font-size", "12px");

    // ---- DRIVER 2 (YELLOW) ----
    groups.append("rect")
      .attr("x", chartWidth * 0.55)
      .attr("height", barHeight)
      .attr("width", d => xScale(d.d2))
      .attr("fill", "#FFC20A");

    groups.append("text")
      .text(d => d.d2)
      .attr("x", d => chartWidth * 0.55 + xScale(d.d2) + 6)
      .attr("y", barHeight / 2 + 5)
      .attr("fill", "white")
      .style("font-size", "12px");
  
    // Driver names
    groups.append("text")
      .text(d1.name)
      .attr("x", 0)
      .attr("y", barHeight + 20)
      .attr("fill", "#0C7BDC")
      .style("font-size", "13px")
      .style("font-weight", "600");

    groups.append("text")
      .text(d2.name)
      .attr("x", chartWidth * 0.55)
      .attr("y", barHeight + 20)
      .attr("fill", "#FFC20A")
      .style("font-size", "13px")
      .style("font-weight", "600");

  }





  function renderBars(d1, d2) {
    const container = d3.select("#comparison-bars");
    container.html("");
  
    const metrics = [
      { label: "Seasons", d1: d1.seasons, d2: d2.seasons },
      { label: "Races", d1: d1.races, d2: d2.races },
      { label: "Wins", d1: d1.wins, d2: d2.wins },
      { label: "Championships", d1: d1.championships, d2: d2.championships }
    ];
  
    const maxVal = d3.max(metrics.map(m => Math.max(m.d1, m.d2)));
  
    metrics.forEach(m => {
      const row = container.append("div").attr("class", "compare-row");
  
      // Left bar
      row.append("div")
        .attr("class", "bar-left")
        .style("width", (m.d1 / maxVal * 100) + "%")
        .text(m.d1);
  
      // Center label
      row.append("div")
        .attr("class", "bar-label")
        .text(m.label);
  
      // Right bar
      row.append("div")
        .attr("class", "bar-right")
        .style("width", (m.d2 / maxVal * 100) + "%")
        .text(m.d2);
    });
}