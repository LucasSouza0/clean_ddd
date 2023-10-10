import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = [];

  constructor() { }

  async findById(id: string): Promise<Notification | null> {
    const question = this.items.find(item => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === notification.id);
    this.items[itemIndex] = notification;
  }
}
