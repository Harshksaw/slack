/**
 * Example User Service
 * Contains business logic for user operations
 */

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    // Business logic validations
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // TODO: Hash password before saving
    // userData.password = await bcrypt.hash(userData.password, 10);

    const user = await this.userRepository.create(userData);
    return user;
  }

  async getUserById(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(userId, updateData) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Business logic for updates
    const updatedUser = await this.userRepository.update(userId, updateData);
    return updatedUser;
  }

  async deleteUser(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(userId);
    return true;
  }
}

export default UserService;
