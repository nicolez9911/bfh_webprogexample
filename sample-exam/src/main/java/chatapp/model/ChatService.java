package chatapp.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ChatService {

	private static final ChatService instance = new ChatService();

	private final List<ChatMessage> messages = new ArrayList<>();
	private int lastId = 0;

	public static ChatService getInstance() {
		return instance;
	}

	private ChatService() {
		try (Scanner scanner = new Scanner(ChatService.class.getResourceAsStream("/messages.txt"))) {
			while (scanner.hasNextLine()) {
				String[] tokens = scanner.nextLine().split(":");
				addMessage(new ChatMessage(tokens[0], tokens[1]));
			}
		} catch (Exception ex) {
			System.out.println(ex);
		}
	}

	protected ChatMessage getMessage(int id) {
		for (int i = 0; i < messages.size(); i++) {
			if (messages.get(i).getId() == id) {
				return messages.get(i);
			}
		}
		return null;
	}

	public List<ChatMessage> getMessages() {
		return messages;
	}

	public List<ChatMessage> getMessages(String subject) {
		List<ChatMessage> messagesForSubject = new ArrayList<>();
		for (ChatMessage message:messages) {
			if (message.getSubject().equals(subject)) {
				messagesForSubject.add(message);
			}
		}
		return messagesForSubject;
	}

	public List<String> getSubjects() {
		List<String> subjects = new ArrayList<>();
		for (ChatMessage message:messages) {
			if (subjects.indexOf(message.getSubject()) == -1) {
				subjects.add(message.getSubject());
			}
		}
		return subjects;
	}

	public void addMessage(ChatMessage message) {
		message.setId(++lastId);
		messages.add(message);
	}

	public void removeMessage(int id) throws MessageNotFoundException {
		ChatMessage messageToRemove = this.getMessage(id);
		if (messageToRemove != null) {
			messages.remove(messageToRemove);
		} else {
			throw new MessageNotFoundException();
		}
	}
}
