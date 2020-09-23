import { renderHook, act } from '@testing-library/react-hooks';
import { User } from './model';
import { useUser } from './user.hooks';

describe('useUser specs', () => {
  it('should return user with initial values and setUser method when it calls it', async () => {
    // Arrange
    const initialUser: User = {
      name: 'John',
      surname: 'Doe',
    };

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useUser(initialUser)
    );

    await waitForNextUpdate();

    // Assert
    const expectUser = {
      name: 'Jane',
      surname: 'Smith',
    };
    expect(result.current.user).toEqual(expectUser);
    expect(result.current.setUser).toEqual(expect.any(Function));
  });
  it('should update user when it calls setUsert', () => {
    // Arrange
    const initialUser: User = {
      name: 'John',
      surname: 'Doe',
    };

    // Act
    const { result } = renderHook(() => useUser(initialUser));

    act(() => {
      result.current.setUser({
        name: 'new name',
        surname: 'new surname',
      });
    });

    // Assert
    expect(result.current.user).toEqual({
      name: 'new name',
      surname: 'new surname',
    });
  });
});
