import { faker } from '@faker-js/faker';

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Notification, NotificationProps } from '@/domain/notification/enterprise/entities/notification';

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create({
    recipientId: new UniqueEntityId(),
    title: faker.lorem.sentence(),
    content: faker.lorem.sentence(),
    ...override
  }, id);

  return notification;
}
