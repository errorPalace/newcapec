import java.util.regex.Pattern;


public class name {

	public static void main(String[] args) {
		String regex = "^[\\p{L} .'-]+$";

		boolean isName = Pattern.matches(regex, "孙方");
         System.out.println(isName);
	}

}
