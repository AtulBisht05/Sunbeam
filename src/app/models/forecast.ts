export class Forecast {
    constructor(public dt,
                public time,
                public icon,
                public temp,
                public humidity,
                public tempMax,
                public tempMin,
                public des,
                public rain,
                public wind_speed,
                public clouds,
                public pressure
    ) { }
}
