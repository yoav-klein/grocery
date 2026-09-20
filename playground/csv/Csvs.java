
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Csvs {
    
    public static void main(String[] args)  {
        System.out.println("Hello");

        try(BufferedReader reader = new BufferedReader(new FileReader("products.csv"))) {
            String line;
            while((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                for(int i = 0; i < parts.length; ++i) {
                    System.out.println(parts[i]);
                }
            }
        } catch(IOException e) {
            System.out.println(e);
        }
    }
}
