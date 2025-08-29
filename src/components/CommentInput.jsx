import React, { useState } from "react";
import { useSelector } from "react-redux";
import SignInButton from "./SignInButton";

const CommentInput = ({ onAdd }) => {
  const user = useSelector((s) => s.auth.user);
  const [text, setText] = useState("");

  if (!user)
    return (
      <div className="p-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">Sign in to comment.</p>
        <SignInButton className="mt-2" />
      </div>
    );

  return (
    <form
      className="flex items-start gap-2 p-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd?.({
          id: Date.now(),
          name: user.displayName || "You",
          text: text.trim(),
          replies: [],
        });
        setText("");
      }}
    >
      {user?.photoURL ? (
        <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      )}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 min-h-[40px] p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
      />
      <button
        type="submit"
        className="px-3 py-2 rounded-md bg-blue-600 text-white disabled:opacity-60"
        disabled={!text.trim()}
      >
        Comment
      </button>
    </form>
  );
};

export default CommentInput;

