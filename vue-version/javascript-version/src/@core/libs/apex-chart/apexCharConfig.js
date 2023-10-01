import { hexToRgb } from '@layouts/utils'


// 颜色变量
const colorVariables = themeColors => {
  const themeSecondaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['medium-emphasis-opacity']})`
  const themeDisabledTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['disabled-opacity']})`
  const themeBorderColor = `rgba(${hexToRgb(String(themeColors.variables['border-color']))},${themeColors.variables['border-opacity']})`
  const themePrimaryTextColor = `rgba(${hexToRgb(themeColors.colors['on-surface'])},${themeColors.variables['high-emphasis-opacity']})`

  return { themeSecondaryTextColor, themeDisabledTextColor, themeBorderColor, themePrimaryTextColor }
}

export const getScatterChartConfig = themeColors => {
  const scatterColors = {
    series1: '#ff9f43',
    series2: '#3366cc',
    series3: '#28c76f',
  }

  const { themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: {
        type: 'xy',
        enabled: true,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      markers: { offsetX: -3 },
      fontSize: '13px',
      labels: { colors: themeSecondaryTextColor },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    colors: [scatterColors.series1, scatterColors.series2, scatterColors.series3],
    grid: {
      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: true },
      },
    },
    yaxis: {
      labels: {
        style: { fontSize: '0.8125rem', colors: themeDisabledTextColor },
      },
    },
    xaxis: {
      tickAmount: 10,
      axisBorder: { show: false },
      axisTicks: { color: themeBorderColor },
      crosshairs: {
        stroke: { color: themeBorderColor },
      },
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
        formatter: val => parseFloat(val).toFixed(1),
      },
    },
  }
}
export const getLineChartSimpleConfig = themeColors => {
  const { themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ['#ff9f43'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff'],
    },
    grid: {
      padding: { top: -10 },
      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: true },
      },
    },
    tooltip: {
      custom(data) {
        return `<div class='bar-chart pa-2'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
        </div>`
      },
    },
    yaxis: {
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: themeBorderColor },
      crosshairs: {
        stroke: { color: themeBorderColor },
      },
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
      categories: [
        '6月7日',
        '6月8日',
        '6月9日',
        '6月10日',
        '6月11日',
        '6月12日',
        '6月13日',
        '6月14日',
        '6月15日',
        '6月16日',
        '6月17日',
        '6月18日',
        '6月19日',
        '6月20日',
        '6月21日',
      ],
    },
  }
}
export const getBarChartConfig = themeColors => {
  const { themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '30%',
        horizontal: true,
        startingShape: 'rounded',
      },
    },
    grid: {
      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: false },
      },
      padding: {
        top: -10,
      },
    },
    yaxis: {
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: themeBorderColor },
      categories: ['6月1日', '6月2日', '6月3日', '6月4日', '6月5日', '6月6日', '6月7日'],
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
    },
  }
}
export const getCandlestickChartConfig = themeColors => {
  const candlestickColors = {
    series1: '#28c76f',
    series2: '#ea5455',
  }

  const { themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    tooltip: {
      custom({ seriesIndex, dataPointIndex, w }) {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]

        return '<div class="apexcharts-tooltip-candlestick">' +
            '<div>开盘价: ' + o + '</div>' +
            '<div>最高价: ' + h + '</div>' +
            '<div>最低价: ' + l + '</div>' +
            '<div>收盘价: ' + c + '</div>' +
            '</div>'
      },
    },
    plotOptions: {
      bar: { columnWidth: '40%' },
      candlestick: {
        colors: {
          upward: candlestickColors.series1,
          downward: candlestickColors.series2,
        },
      },
    },
    grid: {
      padding: { top: -10 },
      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: true },
      },
    },
    yaxis: {
      tooltip: { enabled: true },
      crosshairs: {
        stroke: { color: themeBorderColor },
      },
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
    },
    xaxis: {
      type: 'category',
      axisBorder: { show: false },
      axisTicks: { color: themeBorderColor },
      crosshairs: {
        stroke: { color: themeBorderColor },
      },
      labels: {
        // format: 'yyyy/MM/dd',
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
    },
  }
}
export const getRadialBarChartConfig = themeColors => {
  const radialBarColors = {
    series1: '#fdd835',
    series2: '#32baff',
    series3: '#00d4bd',
    series4: '#3366cc',
    series5: '#FFA1A1',
  }

  const { themeSecondaryTextColor, themePrimaryTextColor } = colorVariables(themeColors)

  return {
    stroke: { lineCap: 'round' },
    labels: ['评论', '回复', '分享'],
    legend: {
      show: true,
      fontSize: '13px',
      position: 'bottom',
      labels: {
        colors: themeSecondaryTextColor,
      },
      markers: {
        offsetX: -3,
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    colors: [radialBarColors.series1, radialBarColors.series2, radialBarColors.series4],
    plotOptions: {
      radialBar: {
        hollow: { size: '30%' },
        track: {
          margin: 15,
          background: themeColors.colors['grey-100'],
        },
        dataLabels: {
          name: {
            fontSize: '2rem',
          },
          value: {
            fontSize: '0.9375rem',
            color: themeSecondaryTextColor,
          },
          total: {
            show: true,
            fontWeight: 400,
            label: '评论',
            fontSize: '1.125rem',
            color: themePrimaryTextColor,
            formatter(w) {
              const totalValue = w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0) / w.globals.series.length

              if (totalValue % 1 === 0)
                return `${totalValue}%`
              else
                return `${totalValue.toFixed(2)}%`
            },
          },
        },
      },
    },
    grid: {
      padding: {
        top: -30,
        bottom: -25,
      },
    },
  }
}
export const getDonutChartConfig = themeColors => {
  const donutColors = {
    series1: '#fdd835',
    series2: '#00d4bd',
    series3: '#3366cc',
    series4: '#32baff',
    series5: '#ffa1a1',
  }

  const { themeSecondaryTextColor, themePrimaryTextColor } = colorVariables(themeColors)

  return {
    stroke: { width: 0 },
    labels: ['运营', '网络', '招聘', '研发'],
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter: val => `${parseInt(val, 10)}%`,
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      fontSize: '13px',
      labels: { colors: themeSecondaryTextColor },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.125rem',
            },
            value: {
              fontSize: '1.125rem',
              color: themeSecondaryTextColor,
              formatter: val => `${parseInt(val, 10)}`,
            },
            total: {
              show: true,
              fontSize: '1.125rem',
              label: '运营',
              formatter: () => '31%',
              color: themePrimaryTextColor,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '0.9375rem',
                  },
                  value: {
                    fontSize: '0.9375rem',
                  },
                  total: {
                    fontSize: '0.9375rem',
                  },
                },
              },
            },
          },
        },
      },
    ],
  }
}
export const getAreaChartSplineConfig = themeColors => {
  const areaColors = {
    series3: '#97add7',
    series2: '#6187d5',
    series1: '#3366cc',
  }

  const { themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      curve: 'straight',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '13px',
      labels: { colors: themeSecondaryTextColor },
      markers: {
        offsetY: 1,
        offsetX: -3,
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    colors: [areaColors.series3, areaColors.series2, areaColors.series1],
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      show: true,
      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: true },
      },
    },
    yaxis: {
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: themeBorderColor },
      crosshairs: {
        stroke: { color: themeBorderColor },
      },
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
      categories: [
        '6月7日',
        '6月8日',
        '6月9日',
        '6月10日',
        '6月11日',
        '6月12日',
        '6月13日',
        '6月14日',
        '6月15日',
        '6月16日',
        '6月17日',
        '6月18日',
        '6月19日',
      ],
    },
  }
}
export const getColumnChartConfig = themeColors => {
  const columnColors = {
    series1: '#3366cc',
    series2: '#7090d2',
    bg: '#c3ccde',
  }

  const { themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: [columnColors.series1, columnColors.series2],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '13px',
      labels: { colors: themeSecondaryTextColor },
      markers: {
        offsetY: 1,
        offsetX: -3,
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    stroke: {
      show: true,
      colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarRadius: 10,
          backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
        },
      },
    },
    grid: {
      borderColor: themeBorderColor,
      xaxis: {
        lines: { show: true },
      },
    },
    yaxis: {
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: themeBorderColor },
      categories: ['6月7日', '6月8日', '6月9日', '6月10日', '6月11日', '6月12日', '6月13日', '6月14日', '6月15日'],
      crosshairs: {
        stroke: { color: themeBorderColor },
      },
      labels: {
        style: { colors: themeDisabledTextColor, fontSize: '0.8125rem' },
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%',
            },
          },
        },
      },
    ],
  }
}
export const getHeatMapChartConfig = themeColors => {
  const { themeSecondaryTextColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      colors: [themeColors.colors.surface],
    },
    legend: {
      position: 'bottom',
      fontSize: '13px',
      labels: {
        colors: themeSecondaryTextColor,
      },
      markers: {
        offsetY: 0,
        offsetX: -3,
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    plotOptions: {
      heatmap: {
        enableShades: false,
        colorScale: {
          ranges: [
            { to: 10, from: 0, name: '0-10', color: '#9cadce' },
            { to: 20, from: 11, name: '10-20', color: '#829ed0' },
            { to: 30, from: 21, name: '20-30', color: '#6b92cc' },
            { to: 40, from: 31, name: '30-40', color: '#5580d0' },
            { to: 50, from: 41, name: '40-50', color: '#4474d3' },
            { to: 60, from: 51, name: '50-60', color: '#3366cc' },
          ],
        },
      },
    },
    grid: {
      padding: { top: -20 },
    },
    yaxis: {
      labels: {
        style: {
          colors: themeDisabledTextColor,
          fontSize: '0.8125rem',
        },
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
  }
}
export const getRadarChartConfig = themeColors => {
  const radarColors = {
    series1: '#3366cc',
    series2: '#ffa1a1',
  }

  const { themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor } = colorVariables(themeColors)

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 1,
        blur: 8,
        left: 1,
        opacity: 0.2,
        enabled: false,
      },
    },
    markers: { size: 0 },
    fill: { opacity: [1, 0.8] },
    colors: [radarColors.series1, radarColors.series2],
    stroke: {
      width: 0,
      show: false,
    },
    legend: {
      fontSize: '13px',
      labels: {
        colors: themeSecondaryTextColor,
      },
      markers: {
        offsetX: -3,
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10,
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: themeBorderColor,
          connectorColors: themeBorderColor,
        },
      },
    },
    grid: {
      show: false,
      padding: {
        top: -20,
        bottom: -20,
      },
    },
    yaxis: { show: false },
    xaxis: {
      categories: ['电池', '品牌', '相机', '内存', '存储', '显示屏', '操作系统', '价格'],
      labels: {
        style: {
          fontSize: '0.8125rem',
          colors: [
            themeDisabledTextColor,
            themeDisabledTextColor,
            themeDisabledTextColor,
            themeDisabledTextColor,
            themeDisabledTextColor,
            themeDisabledTextColor,
            themeDisabledTextColor,
            themeDisabledTextColor,
          ],
        },
      },
    },
  }
}
