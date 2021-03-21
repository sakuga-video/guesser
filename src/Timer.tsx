import { CircularProgress } from "@material-ui/core"
import { useEffect } from "react";
import { useTimer } from "use-timer";

type Props = {
    duration: number,
    on_time_over?: () => void,
    className?: string,
    interval?: number,
    count_down?: boolean,
    show_emergency_color?: boolean,
}

const Timer = ({
    duration,
    on_time_over,
    interval=50,
    className,
    count_down=false,
    show_emergency_color=false,
}: Props) => {
    const adjusted_duration = duration * 1000 / interval;
    const { time, start, reset } = useTimer({
        endTime: adjusted_duration,
        interval,
        onTimeOver: on_time_over,
    });

    useEffect(() => {
        start();
        return reset;
    }, [reset, start]);

    const normalize = (value: number) => {
        const adjusted_value = count_down ? adjusted_duration - value : value;
        return adjusted_value * 100 / adjusted_duration;
    }

    return <CircularProgress
        color={normalize(time) < 25 && show_emergency_color ? "secondary" : "primary"}
        variant="determinate"
        value={normalize(time)}
        className={className} />
}

export default Timer;