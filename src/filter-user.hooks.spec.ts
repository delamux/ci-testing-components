import { renderHook, act } from '@testing-library/react-hooks';
import * as api from './api';
import { useFilterUsers } from './filter-user.hooks';

describe('useFilterUsers specs', () => {
  it('should call getUsersByFilter and update users when it feeds filter equals "doe"', async () => {
    // Arrange
    const filter = 'doe';
    const getUserByFilterStub = jest
      .spyOn(api, 'getUsersByFilter')
      .mockResolvedValue(['John Doe', 'Jane Doe']);

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useFilterUsers(filter)
    );

    // Assert
    expect(result.current.users).toEqual([]);

    await waitForNextUpdate();
    expect(getUserByFilterStub).toHaveBeenCalledWith(filter);
    expect(result.current.users).toEqual(['John Doe', 'Jane Doe']);
  });
  it('should call getUsersByFilter only one time when it calls filterUsers with same filter two times', async () => {
    // Arrange
    const filter = 'doe';
    const getUserByFilterStub = jest
      .spyOn(api, 'getUsersByFilter')
      .mockResolvedValue(['John Doe', 'Jane Doe']);

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useFilterUsers(filter)
    );

    // Assert
    act(() => {
      result.current.setFilter('doe');
    });
    await waitForNextUpdate();

    expect(getUserByFilterStub).toHaveBeenCalledWith('doe');
    expect(getUserByFilterStub).toHaveBeenCalledTimes(1);
  });
  it('should call getUsersByFilter three times when it calls filterUsers with different filters', async () => {
    // Arrange
    const filter = 'doe';
    const getUserByFilterStub = jest
      .spyOn(api, 'getUsersByFilter')
      .mockResolvedValue(['John Doe', 'Jane Doe']);

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useFilterUsers(filter)
    );

    // Assert
    act(() => {
      result.current.setFilter('smith');
    });
    await waitForNextUpdate();
    act(() => {
      result.current.setFilter('Jane');
    });
    await waitForNextUpdate();

    expect(getUserByFilterStub).toHaveBeenCalledWith('doe');
    expect(getUserByFilterStub).toHaveBeenCalledWith('smith');
    expect(getUserByFilterStub).toHaveBeenCalledWith('Jane');
    expect(getUserByFilterStub).toHaveBeenCalledTimes(3);
  });
  it('testing real api three times when it calls filterUsers with different filters', async () => {
    // Arrange
    const filter = 'doe';

    // const getUserByFilterStub = jest
    //   .spyOn(api, 'getUsersByFilter')
    //   .mockResolvedValue(['John Doe', 'Jane Doe']);

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useFilterUsers('doe')
    );

    // Assert
    expect(result.current.users).toEqual([]);

    await waitForNextUpdate();
    expect(result.current.users).toEqual([]);

    act(() => {
      result.current.setFilter('lea');
    });

    await waitForNextUpdate();
    expect(result.current.users).toEqual(['Leanne Graham']);
  });
});
