package tellabouttest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.amazon.speech.speechlet.IntentRequest;
import com.amazon.speech.speechlet.LaunchRequest;
import com.amazon.speech.speechlet.Session;
import com.amazon.speech.speechlet.SessionEndedRequest;
import com.amazon.speech.speechlet.SessionStartedRequest;
import com.amazon.speech.speechlet.Speechlet;
import com.amazon.speech.speechlet.SpeechletException;
import com.amazon.speech.speechlet.SpeechletResponse;
import com.amazon.speech.ui.SsmlOutputSpeech;
import com.amazon.speech.ui.Reprompt;
import com.amazon.speech.ui.SimpleCard;


/**
 * Created by Adam on 10/3/2015.
 */
public class TellAboutTestSpeechlet implements Speechlet  {

    private static final Logger log = LoggerFactory.getLogger(TellAboutTestSpeechlet.class);

    @Override
    public void onSessionStarted(final SessionStartedRequest request, final Session session)
            throws SpeechletException {
        log.info("onSessionStarted requestId={}, sessionId={}", request.getRequestId(),
                session.getSessionId());

        // any initialization logic goes here
    }
    @Override
    public SpeechletResponse onLaunch(final LaunchRequest request, final Session session)
            throws SpeechletException {
        log.info("onLaunch requestId={}, sessionId={}", request.getRequestId(),
                session.getSessionId());

        return handleTypeTestIntent(session);
    }


    @Override
    public SpeechletResponse onIntent(final IntentRequest request, final Session session)
            throws SpeechletException {
        log.info("onIntent requestId={}, sessionId={}", request.getRequestId(), session.getSessionId());
            return handleReturnTestIntent(session);
    }

    @Override
    public void onSessionEnded(final SessionEndedRequest request, final Session session)
            throws SpeechletException {
        log.info("onSessionEnded requestId={}, sessionId={}", request.getRequestId(),
                session.getSessionId());

        // any session cleanup logic would go here
    }

    private SpeechletResponse handleTypeTestIntent(final Session session) {
        String speechOutput = "What was the test?";

        // Reprompt speech will be triggered if the user doesn't respond.
        String repromptText = "I'm sorry I didn't catch that";

        // Create the Simple card content.
        SimpleCard card = new SimpleCard();
        card.setTitle("Lebron");
        card.setContent(speechOutput);

        SpeechletResponse response = newAskResponse("<speak>" + speechOutput + "</speak>",
                "<speak>" + repromptText + "</speak>");
        response.setCard(card);
        return response;
    }

    private SpeechletResponse handleReturnTestIntent(final Session session) {
        String speechOutput = "What was Your grade?";

        // Reprompt speech will be triggered if the user doesn't respond.
        String repromptText = "I'm sorry I didn't catch that";

        // Create the Simple card content

        SpeechletResponse response = newAskResponse("<speak>" + speechOutput + "</speak>",
                "<speak>" + repromptText + "</speak>");
        return response;
    }

    private SpeechletResponse newAskResponse(String stringOutput, String repromptText) {
        SsmlOutputSpeech outputSpeech = new SsmlOutputSpeech();
        outputSpeech.setSsml(stringOutput);
        SsmlOutputSpeech repromptOutputSpeech = new SsmlOutputSpeech();
        repromptOutputSpeech.setSsml(repromptText);
        Reprompt reprompt = new Reprompt();
        reprompt.setOutputSpeech(repromptOutputSpeech);
        return SpeechletResponse.newAskResponse(outputSpeech, reprompt);
    }

}
