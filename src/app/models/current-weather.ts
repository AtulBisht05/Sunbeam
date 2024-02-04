export class CurrentWeather {
    constructor(
        public city,
        public country,
        public temp,
        public humid,
        public pressure,
        public icon,
        public cloudiness,
        public weatherKind,
        public date,
        public tempMax,
        public tempMin,
        public sunrise,
        public sunset,
        public coords,
        public wind_speed,
        public wind_deg
    ) { }
}
