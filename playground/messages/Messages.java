
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Messages {
    public static void main(String[] args) {
        try(FileInputStream fis = new FileInputStream("messages.properties")) {
            Properties appProps = new Properties();
            appProps.load(fis);
            System.out.println(appProps.getProperty("world"));
        } catch(IOException e) {

        }

    }    
}
