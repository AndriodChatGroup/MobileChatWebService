import org.json.JSONException;
import org.json.JSONObject;

public class JSONUtils
{
    // flags to identify the kind of json response on client side
    private static final String
            FLAG_SELF = "self",
            FLAG_NEW = "new",
            FLAG_MESSAGE = "message",
            FLAG_EXIT = "exit";

    public JSONUtils()
    {
    }

    /**
     * Json when client needs it's own session details
     * @param sessionId
     * @param message
     * @return
     */
    public String getClientDetailsJson(String sessionId, String message)
    {
        String json = null;
        try
        {
            JSONObject jObj = new JSONObject();
            jObj.put("flag", FLAG_SELF);
            jObj.put("sessionId", sessionId);
            jObj.put("message", message);
            json = jObj.toString();
        }
        catch (JSONException e)
        {
            e.printStackTrace();
        }
        return json;
    }

    /**
     * Json to notify all the clients about new person joined
     * @param sessionId
     * @param name
     * @param message
     * @param onlineCount
     * @return
     */
    public String getNewClientJson(String sessionId, String name, String message, int onlineCount)
    {
        String json = null;

        try
        {
            JSONObject jObj = new JSONObject();
            jObj.put("flag", FLAG_NEW);
            jObj.put("name", name);
            jObj.put("sessionId", sessionId);
            jObj.put("message", message);
            jObj.put("onlineCount", onlineCount);
            json = jObj.toString();
        }
        catch (JSONException e)
        {
            e.printStackTrace();
        }
        return json;
    }

    /**
     * Json when the client exits the socket connection
     * @param sessionId
     * @param name
     * @param message
     * @param onlineCount
     * @return
     */
    public String getClientExitJson(String sessionId, String name, String message, int onlineCount)
    {
        String json = null;
        try
        {
            JSONObject jObj = new JSONObject();
            jObj.put("flag", FLAG_EXIT);
            jObj.put("name", name);
            jObj.put("sessionId", sessionId);
            jObj.put("message", message);
            jObj.put("onlineCount", onlineCount);
            json = jObj.toString();
        }
        catch (JSONException e)
        {
            e.printStackTrace();
        }
        return json;
    }

    /**
     * JSON when message needs to be sent to all the clients
     * @param sessionId
     * @param fromName
     * @param message
     * @return
     */
    public String getSendAllMessageJson(String sessionId, String fromName, String message)
    {
        String json = null;
        try
        {
            JSONObject jObj = new JSONObject();
            jObj.put("flag", FLAG_MESSAGE);
            jObj.put("sessionId", sessionId);
            jObj.put("name", fromName);
            jObj.put("message", message);
            json = jObj.toString();
        }
        catch (JSONException e)
        {
            e.printStackTrace();
        }
        return json;
    }
}
