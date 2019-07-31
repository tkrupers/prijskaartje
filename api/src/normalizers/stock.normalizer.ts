export const normalizeTimeSeries = (timeSeries: Record<string, string>[]) => {
    const result = [];

    Object.keys(timeSeries).forEach((t, index) => {
        const day = Object.values(timeSeries)[index];
        const close = Object.values(day)[3];
        result.push({ x: t, y: parseFloat(close) });
    });

    const min = result.length - 10;
    const max = result.length;

    return result.reverse().slice(min, max);
};

export const normalizeStockData = (data: Record<string, any>) => {
    const [meta, timeSeries] = Object.values(data);
    const metaValues = Object.values(meta);

    return [
        {
            id: metaValues[1],
            updatedAt: metaValues[2],
            data: normalizeTimeSeries(timeSeries),
        },
    ];
};
