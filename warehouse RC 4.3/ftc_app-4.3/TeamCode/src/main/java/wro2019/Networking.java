package wro2019;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

public class Networking {

    public static HttpURLConnection getConnection(String urlToGet) {
        URL url = null;
        try {
            url = new URL(urlToGet);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        HttpURLConnection httpURLConnection = null;
        try {
            assert url != null;
            httpURLConnection = (HttpURLConnection) url.openConnection();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            assert httpURLConnection != null;
            httpURLConnection.setRequestMethod("GET");
        } catch (ProtocolException e) {
            e.printStackTrace();
        }

        httpURLConnection.setRequestProperty("Content-Type", "text/plain");

        httpURLConnection.setConnectTimeout(5000);
        httpURLConnection.setReadTimeout(5000);


        return httpURLConnection;
    }

    public static String getResponse(String urlToGet) throws IOException {

        HttpURLConnection con = getConnection(urlToGet);
        Reader streamReader = null;

        if (con.getResponseCode() > 299) {
            streamReader = new InputStreamReader(con.getErrorStream());
        } else {
            streamReader = new InputStreamReader(con.getInputStream());
        }

        BufferedReader in = new BufferedReader(streamReader);
        String inputLine;
        StringBuilder content = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
            content.append("\n");
        }

        in.close();

        return content.toString();
    }
}