import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class TimerTest
{
    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");

    static class TimerTaskDemo extends TimerTask
    {
        @Override
        public void run()
        {
            Calendar calendar = Calendar.getInstance();
            Date date = calendar.getTime();
            System.out.println(sdf.format(date));
        }
    }

    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);
        String targetTime = scanner.nextLine();
        Date targetDate = new Date();
        try
        {
            targetDate = sdf.parse(targetTime);
        }
        catch (ParseException e)
        {
            e.printStackTrace();
        }
        Date currentDate = new Date();
        long time = targetDate.getTime() - currentDate.getTime();
        Timer timer = new Timer();
        timer.schedule(new TimerTaskDemo(), time);
        timer.schedule(new TimerTaskDemo(), time + 1000);
    }
}
