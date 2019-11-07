package wro2019;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class CommandModel {
    static final String baseUrl = "http://192.168.43.74/";

    public int lastCommandId;

    CommandModel() {
        lastCommandId = -1;
    }

    public Command getNewCommand() throws Exception {
        String response = "";
        try {
            response = Networking.getResponse(baseUrl + "command/getLastCommand");
            if (response.equals("-")) {
                return null;
            }
            return new Command(
                    Integer.parseInt(response.split("\n")[0]),
                    response.split("\n")[1],
                    response.split("\n")[2]
            );

        } catch (IOException e) {
            throw new Exception("network error");
        } catch (NullPointerException e) {
            throw new Exception("Value: " + response.split("\n")[0]);
        }
    }

    public boolean sendCommand(String topic, String message) throws IOException {

            return "ok".equals(Networking.getResponse(baseUrl + "command/sendCommand/" + urlEncode(topic) + "/" + urlEncode(message)).trim());

    }

    private String urlEncode(String string){
        try {
            return URLEncoder.encode(string.replace("/", "(PER)"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return "";
    }
}