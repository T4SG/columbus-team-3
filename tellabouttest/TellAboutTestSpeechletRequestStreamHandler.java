package tellabouttest;

import java.util.HashSet;
import java.util.Set;

import com.amazon.speech.speechlet.Speechlet;
import com.amazon.speech.speechlet.lambda.SpeechletRequestStreamHandler;

/**
 * Created by Adam on 10/3/2015.
 */
public class TellAboutTestSpeechletRequestStreamHandler extends SpeechletRequestStreamHandler {
    private static final Set<String> supportedApplicationIds;

    static {
        /*
         * This Id can be found on https://developer.amazon.com/edw/home.html#/ "Edit" the relevant
         * Alexa Skill and put the relevant Application Ids in this Set.
         */
        supportedApplicationIds = new HashSet<String>();
        // supportedApplicationIds.add("amzn1.echo-sdk-ams.app.[unique-value-here]");
    }

    public TellAboutTestSpeechletRequestStreamHandler() {
        super(new TellAboutTestSpeechlet(), supportedApplicationIds);
    }

    public TellAboutTestSpeechletRequestStreamHandler(Speechlet speechlet,
                                                Set<String> supportedApplicationIds) {
        super(speechlet, supportedApplicationIds);
    }
}
