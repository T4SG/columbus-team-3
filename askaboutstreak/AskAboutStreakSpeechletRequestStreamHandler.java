package askaboutstreak;

 import java.util.HashSet;
 import java.util.Set;

 import com.amazon.speech.speechlet.lambda.SpeechletRequestStreamHandler;
/**
 * Created by Adam on 10/3/2015.
 */
public class AskAboutStreakSpeechletRequestStreamHandler {
    private static final Set<String> supportedApplicationIds = new HashSet<String>();
    static {
        /*
         * This Id can be found on https://developer.amazon.com/edw/home.html#/ "Edit" the relevant
         * Alexa Skill and put the relevant Application Ids in this Set.
         */
        supportedApplicationIds.add("amzn1.echo-sdk-ams.app.[unique-value-here]");
    }

    public AskAboutStreakSpeechletRequestStreamHandler() {
        //super(new AskAboutStreakSpeechlet(), supportedApplicationIds);
    }
}
